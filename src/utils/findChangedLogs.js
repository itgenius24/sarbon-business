export function findChangedLogs(staticArray, changingArray) {
  const changedLogs = [];

  changingArray?.forEach((changingItem) => {
    const staticItem = staticArray?.find(
      (item) => item?.id === changingItem?.id
    );

    if (
      !staticItem ||
      changingItem?.address !== staticItem?.name ||
      changingItem?.cor !== `${staticItem?.lat} ${staticItem?.long}` ||
      changingItem?.from_date !== new Date(staticItem?.date) ||
      // changingItem?.loading_num !== staticItem?.expectations ||
      changingItem?.to_date !== staticItem?.date
    ) {
      changedLogs.push(changingItem);
    }
  });

  return changedLogs;
}
