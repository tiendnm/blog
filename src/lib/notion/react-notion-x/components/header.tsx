import * as React from "react";

import * as types from "@/lib/notion/notion-types";
import { getPageBreadcrumbs } from "@/lib/notion/notion-utils";

import { useNotionContext } from "../context";
import { cs } from "../utils";
import { PageIcon } from "./page-icon";

export const Header: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock;
}> = ({ block }) => {
  return (
    <header className="notion-header">
      <div className="notion-nav-header">
        <Breadcrumbs block={block} />
      </div>
    </header>
  );
};

export const Breadcrumbs: React.FC<{
  block: types.Block;
  rootOnly?: boolean;
}> = ({ block, rootOnly = false }) => {
  const { recordMap, mapPageUrl, components } = useNotionContext();

  const breadcrumbs = React.useMemo(() => {
    const breadcrumbs = getPageBreadcrumbs(recordMap, block.id);
    if (rootOnly) {
      return [breadcrumbs?.[0]].filter(Boolean);
    }

    return breadcrumbs;
  }, [recordMap, block.id, rootOnly]);

  return (
    <div className="breadcrumbs" key="breadcrumbs">
      {breadcrumbs?.map((breadcrumb, index: number) => {
        if (!breadcrumb) {
          return null;
        }

        const pageLinkProps: any = {};
        const componentMap = {
          pageLink: components.PageLink,
        };

        if (breadcrumb.active) {
          componentMap.pageLink = (props: any) => <div {...props} />;
        } else {
          pageLinkProps.href = mapPageUrl(breadcrumb.pageId);
        }

        return (
          <React.Fragment key={breadcrumb.pageId}>
            <componentMap.pageLink
              className={cs("breadcrumb", breadcrumb.active && "active")}
              {...pageLinkProps}
            >
              {breadcrumb.icon && (
                <PageIcon className="icon" block={breadcrumb.block} />
              )}

              {breadcrumb.title && (
                <span className="title">{breadcrumb.title}</span>
              )}
            </componentMap.pageLink>

            {index < breadcrumbs.length - 1 && (
              <span className="spacer">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
