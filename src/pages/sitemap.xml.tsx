import { collection, getDocs } from "firebase/firestore";
import db from "./api/clientApp";
import { generateSiteMap } from "@/utils/utils";

function SiteMap() {

}

export async function getServerSideProps({ res }:any) {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipeNames = querySnapshot.docs.map((doc) => {
      return encodeURI(doc.data().name)
    })
    const siteMap = generateSiteMap(recipeNames)
    res.setHeader('Content-Type', 'text/xml');
    res.write(siteMap);
    res.end();
    return {
        props: {}
    };
}

export default SiteMap;