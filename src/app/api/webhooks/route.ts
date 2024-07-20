import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { createUser } from "@/actions/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  // Handle user.created event
  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    if (!email_addresses || email_addresses.length === 0) {
      return new Response("No email address found for the user", {
        status: 400,
      });
    }

    const email = email_addresses[0].email_address;

    try {
      const newUser = await createUser({
        id: id,
        email,
        clerkUserId: id, // Store Clerk user ID for reference
      });

      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id,
        },
      });

      return NextResponse.json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", {
        status: 500,
      });
    }
  }

  console.log(`Unhandled event type: ${eventType}`);
  return new Response("", { status: 200 });
}
