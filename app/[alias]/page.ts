import { redirect } from "next/navigation";
import getAliasObjectByAlias from "@/lib/getAliasObjectByAlias";

export default async function Alias({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;
    const aliasObject = await getAliasObjectByAlias(alias);
    if (aliasObject == null) {
        redirect("/");
    }
    redirect(aliasObject.url);
}