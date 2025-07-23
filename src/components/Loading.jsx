export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50">
      <div className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
    </div>
  );
};
