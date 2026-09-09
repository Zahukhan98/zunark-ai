import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { canAccessMeeting, ensureStarted } from "@/lib/meetings";
import { prisma } from "@/lib/db";
import { JitsiCallRoom } from "@/components/dashboard/JitsiCallRoom";

export default async function CallPage({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const { meetingId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (!(await canAccessMeeting(meetingId, session.user.id))) notFound();

  const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
  if (!meeting) notFound();
  if (meeting.status === "ENDED" || meeting.status === "CANCELLED") {
    redirect(`/dashboard/meetings/${meetingId}`);
  }

  await ensureStarted(meetingId);

  return (
    <JitsiCallRoom
      meetingId={meetingId}
      meetingTitle={meeting.title}
      displayName={session.user.name ?? "ZUNARK team member"}
      backHref={`/dashboard/meetings/${meetingId}`}
    />
  );
}
