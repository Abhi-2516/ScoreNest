
import { Calculator, TrendingUp, Building, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>VIT CGPA Calculator & Predictor</title>
        <meta name="description" content="Calculate and predict your CGPA at VIT. Access company placement requirements and get AI-powered CGPA insights." />
      </Helmet>

      <div className="flex flex-col items-center">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            VIT's <span className="text-gradient">ScoreNest</span> 
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Simplify your academic planning with our intuitive CGPA calculator, designed specifically for VIT students.
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a 
              href="/calculator"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Calculate CGPA
            </motion.a>
            <motion.a 
              href="/chat"
              className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI CGPA Chat
            </motion.a>
          </motion.div>
        </motion.div>

        <section className="w-full mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="CGPA Calculator"
              description="Calculate your CGPA based on course credits and grades as per VIT standards."
              icon={<Calculator className="w-6 h-6 text-primary" />}
              to="/calculator"
              delay={0.5}
            />
            <FeatureCard
              title="Grade Improvement"
              description="Track how improving grades in specific courses will affect your overall CGPA."
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              to="/improvement"
              delay={0.6}
            />
            <FeatureCard
              title="Company Requirements"
              description="Explore minimum CGPA requirements for companies recruiting at VIT."
              icon={<Building className="w-6 h-6 text-primary" />}
              to="/companies"
              delay={0.7}
            />
            <FeatureCard
              title="CGPA Chat"
              description="Get personalized CGPA advice and insights through our AI-powered chat."
              icon={<MessageSquare className="w-6 h-6 text-primary" />}
              to="/chat"
              delay={0.8}
            />
          </div>
        </section>

        <section className="w-full">
          <motion.h2 
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Why Use Our CGPA Calculator?
          </motion.h2>
          <motion.div 
            className="glass-card rounded-xl p-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">VIT-Specific</h3>
                <p className="text-muted-foreground">
                  Tailored specifically for VIT's grading system and academic policies.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Planning</h3>
                <p className="text-muted-foreground">
                  Plan your academic journey with accurate CGPA predictions and improvement simulations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Career Focused</h3>
                <p className="text-muted-foreground">
                  Know exactly what CGPA you need to qualify for your dream company's placement.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;
