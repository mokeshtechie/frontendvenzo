import FeedbackCard from './FeedbackCard';

export default function FeedbackList({ feedbacks }) {
  return (
    <>
      {feedbacks.map((item) => (
        <FeedbackCard key={item.id} {...item} />
      ))}
    </>
  );
}
