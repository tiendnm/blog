/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "@/components/next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAlgoliaContext } from "@/lib/algolia/components/provider";
import { MinifiedPost } from "@/model/post";
import moment from "moment";
import { Highlight } from "react-instantsearch";
export const Hit = ({ hit }: { hit: MinifiedPost }) => {
  const { setSearchVisible } = useAlgoliaContext();
  return (
    <article>
      <Link
        href={`/blog/${hit.Slug}`}
        onClick={(e) => {
          setSearchVisible(false);
        }}
      >
        <Card className="mb-2">
          <CardHeader>
            <CardTitle>
              {moment(hit.PublishedDate).format("DD/MM/YYYY")}
            </CardTitle>
            <CardDescription>
              <Highlight
                attribute="Title"
                hit={hit as any}
                className="lowercase"
              />
              <Highlight
                attribute="Description"
                className="line-clamp-1 lowercase"
                hit={hit as any}
              />
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </article>
  );
};
