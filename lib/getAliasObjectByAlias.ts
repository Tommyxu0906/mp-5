"use server";
import getCollection, { ALIAS_COLLECTION } from "@/db";
import { AliasProps } from "@/types";

export default async function getAliasObjectByAlias(alias: string): Promise<AliasProps | null> {
    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.findOne({ alias: alias });
    if (!data) {
        return null;
    }
    const aliasObject: AliasProps = {
        id: data._id.toHexString(),
        alias: data.alias,
        url: data.url,
    };
    return aliasObject;
}