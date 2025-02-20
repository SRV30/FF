import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Info } from "lucide-react";
import { useSelector } from "react-redux";

const TrackingStep = ({ step, currentStatus, isLast }) => {
    const {order} = useSelector((state) => state.order);
  const isCurrent = step.orderStatus === currentStatus;
  const isCompleted = step.status !== currentStatus && step.isCompleted;

  return (
    <div className="flex items-center space-x-4">
      {/* Step Indicator */}
      <div className="flex flex-col items-center">
        <motion.div
          className={`rounded-full p-2 ${
            isCurrent
              ? "bg-blue-500 text-white"
              : isCompleted
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
        </motion.div>

        {/* Progress Line */}
        {!isLast && <div className="w-1 h-8 bg-gray-300"></div>}
      </div>

      {/* Step Content */}
      <motion.div
        className={`p-4 border rounded-lg shadow-md w-full ${
          isCurrent ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{step.label}</h3>

          {/* Simple Tooltip using `title` */}
          {step.description && (
            <div title={step.description} className="cursor-pointer">
              <Info size={18} className="text-gray-500" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


TrackingStep.propTypes = {
  step: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool, 
  }).isRequired,
  index: PropTypes.number.isRequired,
  currentStatus: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};

export default TrackingStep;
