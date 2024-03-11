export const EXPEDITOR_ROLE_ID = "f81d3c3d-228d-479e-a2b1-9948c98640f2";
export const DISPATCHER_ROLE_ID = "785678f2-fae7-4a00-8766-99ea67d3784f";

export const DISPATCHER_CLIENT_TYPE_ID = "2ae57983-f68f-487a-b76c-c7166c35dbba";
export const EXPEDITOR_CLIENT_TYPE_ID = "a25d605c-d153-4ddf-8590-e4cda176ef93";

export const userRoleOptions = [
  {
    label: "Диспетчер",
    value: DISPATCHER_ROLE_ID,
  },
  {
    label: "Экспедитор",
    value: EXPEDITOR_ROLE_ID,
  },
];

export const clientTypeIds = {
  EXPEDITOR_ROLE_ID: EXPEDITOR_CLIENT_TYPE_ID,
  DISPATCHER_ROLE_ID: DISPATCHER_CLIENT_TYPE_ID,
};

export const statuses = {
  active: "Активен",
  new: "Предложение",
  in_moderation: "В модерации",
  rejected: "Не прошел модерацию",
  approve_from_driver: "Ждём водителя",
  performed: "В исполнении",
  cancellation: "Отменённые",
  archive: "Архив",
};
