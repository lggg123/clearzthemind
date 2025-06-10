import NavigationBar from '../components/NavigationBar';
import ExecutiveSummary from '../components/ExecutiveSummary';
import Financials from '../components/Financials';
import PitchVideo from '../components/PitchVideo';

const PitchPage: React.FC = () => {
  return (
    <div>
      {/* Include Navigation */}
      <NavigationBar />
      <ExecutiveSummary />
      <Financials />
      <PitchVideo />
    </div>
  );
};

export default PitchPage;