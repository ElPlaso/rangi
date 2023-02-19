import Image from "next/image";
import Sample from "../models/sample";

export default function SampleResult(props: any) {

  const sample: Sample = props.sample || {};

  return (
    <div>
      <h5>{sample.title}</h5>
      <h5>{sample.artist}</h5>
      <h5>{sample.year}</h5>
      <Image
        src={sample.imgUrl as string}
        alt="Song art image"
        width={300}
        height={300}
      />
    </div>
  );

}