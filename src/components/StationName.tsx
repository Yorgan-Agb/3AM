interface StationNameProps {
  stationName: string;
  name?: (value: string) => void;
}

export const StationName = ({ stationName }: StationNameProps) => {
  return (
    <p className="font-lofi font-bold text-gray-700/40 hover:text-yellow-200/40">
      {stationName}
    </p>
  );
};
