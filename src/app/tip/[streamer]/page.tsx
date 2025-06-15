import TipClient from "./TipClient";

type PageProps = {
  params: Promise<{
    streamer: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { streamer } = await params;
  return <TipClient streamer={streamer} />;
}
