export const commentObj = {
    [`log_out`]:`Вышел из своего аккаунта`,
    [`logout`]:`Вышел из своего аккаунта`,
    [`delete_account`]:`Водитель удалил приложение`,
    [`changed_own_info`]:`Изменил личные данные`,
    [`changed_own_password`]:`Изменил пароль`,
    [`export_axcell_driver`]:`Скачал список машин`,
    [`export_axcell_cargo`]:`Скачал список грузов`,
    [`update_first_dispatcher`]:`Изменил данные диспетчера`,
    [`create_first_diaptcher`]:`Создал диспетчера`,
    [`delete_first_dispatcher`]:` Удалил диспетчера`,
    [`blocked_first_dispatcher`]:` Отключил диспетчера`,
    [`accept_order`]:` Принял предложение`,
    [`accept_order_free_driver`]:`Принял предложение без диспетчера`,
    [`cancel_order`]:`Отклонил предложени`,
    [`cancel_order_free_driver`]:`Отклонил предложение без диспетчер`,
    [`unpin_driver`]:`Удалил водителя`,
    [`changed_driver_status`]:`Изменил статус водителя`,
    [`booking_cargo`]:`Забронировал груз`,
    [`offer_to_driver`]:`Предложил груз`,
    [`create_driver`]:`Добавил нового водителя`,
    [`changed_driver_info`]:`Изменил данные водителя`,
    [`delete_driver`]:`Удалил водителя`,
    [`create_unit`]:`Добавил новую машину`,
    [`edit_unit`]:`Редактировал машину`,
    [`edit_driver`]:`Открепил водителя`,
    [`delete_unit`]:`Удалил машину`,
    [`create_cargo`]:`Добавил груз`,
    [`delete_cargo`]:`Удалил груз`,
    [`edit_cargo`]:`Редактировал груз`,
    [`add_driver_to_dispatcher`]:`Назначил водителей диспетчеру`,
    [`delete_driver_to_dispatcher`]:`Открепил водителей`,
}

export const roleObj = {
    [`carrier`]:`Перевозчик`,
    [`voditel`]:`Водитель`,
    [`first_dispatcher`]:`Диспетчер`,
    [`top_dispatcher`]:`Tоп Диспетчер`,
    [`customer`]:`Заказчик`,
    [`ceo`]:`Ceo`
}

export const nameToRole = {
    [`Заказчик`]:`customer`,
    [`Диспетчер`]:`first_dispatcher`,
    [`Перевозчик`]:`carrier`,
    [`Экспедитор`]:`carrier`,
}