import SampleRelation from "@/app/types/sample-relation";

export function alreadyStarred(
  items: SampleRelation[],
  toStar: SampleRelation
) {
  return items.some((relation) => {
    return (
      toStar.sampler.id === relation.sampler.id &&
      toStar.samplee.id === relation.samplee.id
    );
  });
}
