import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../title"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../banner"), { loading: () => <IkasEditorComponentLoader /> });
const Component2 = dynamic(() => import("../slider"), { loading: () => <IkasEditorComponentLoader /> });
const Component3 = dynamic(() => import("../announcement"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "471dfb8e-49ae-4974-aa19-8029a5671040": Component0,"b2a03d8a-6dc6-4be3-82c2-544492395fb7": Component1,"e26b43b6-b0fe-40af-a56a-9455fd0b6700": Component2,"f7123d60-af79-47a2-bec5-4540c1d4a6b7": Component3
};

export default Components;