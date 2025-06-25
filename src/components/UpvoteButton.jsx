import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function UpvoteButton({ initialUpvotes = 0 }) {
  const [count, setCount] = useState(initialUpvotes);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <Button
      variant="contained"
      startIcon={<ArrowUpwardIcon />}
      onClick={handleClick}
    >
      {count}
    </Button>
  );
}
