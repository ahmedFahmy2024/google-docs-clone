import { Editor } from "./_components/editor";

type Props = {
  params: Promise<{ documentId: string }>;
};

export default async function DocumentIdPage({ params }: Props) {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
}
