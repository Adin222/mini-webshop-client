export const Skeleton = ({ skeletonClass }) => {
  return (
    <div role="status" className="animate-pulse">
      <div className={skeletonClass}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
