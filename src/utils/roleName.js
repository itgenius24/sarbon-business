import authStore from "@/store/auth.store";

const dispacherType = authStore?.userData?.dispatcher_type;

export const roleName = {
  ["527d2017-2dc2-4449-9eeb-08fc1aafa469"]: `Директор`,
  ["785678f2-fae7-4a00-8766-99ea67d3784f"]:
    dispacherType?.[0] === `top_dispatcher` ? `Топ-диспетчер` : `Диспетчер`,
  ["48871d27-7361-4f69-8fe4-b54daf270739"]: `Заказчик`,
  ["f81d3c3d-228d-479e-a2b1-9948c98640f2"]: `Перевозчик`,
};
