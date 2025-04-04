
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, to, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6 card-hover"
    >
      <Link to={to} className="block h-full">
        <div className="flex flex-col h-full">
          <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground flex-grow mb-4">{description}</p>
          <div className="text-primary font-medium flex items-center">
            <span>Explore</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
