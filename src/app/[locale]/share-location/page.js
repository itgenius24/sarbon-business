import { ShareLocationModule } from "@/modules/Cargo/components/ShareLocation";

export default function ShareLocation({params}) {
  const {locale} = params
  return  <ShareLocationModule locale={locale} />

}
