import TipClient from "./TipClient";

type PageProps = {
  params: {
    streamer: string;
  };
};

export default function Page({ params }: PageProps) {
  return <TipClient streamer={params.streamer} />;
}
