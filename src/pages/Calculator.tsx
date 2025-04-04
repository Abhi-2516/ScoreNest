
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Calculator as CalcIcon } from "lucide-react";
import { calculateCGPA, Course } from "../utils/cgpaCalculator";
import PageHeader from "../components/PageHeader";
import { useToast } from "../hooks/use-toast";

const Calculator = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", credits: 3, grade: "S" },
    { id: "2", name: "", credits: 3, grade: "S" },
  ]);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: String(Date.now()),
        name: "",
        credits: 3,
        grade: "S",
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one course.",
        variant: "destructive",
      });
      return;
    }
    setCourses(courses.filter((course) => course.id !== id));
  };

  const updateCourse = (
    id: string,
    field: keyof Course,
    value: string | number
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateResult = () => {
    const result = calculateCGPA(courses);
    setCgpa(result);
    
    toast({
      title: "CGPA Calculated",
      description: `Your CGPA is ${result.toFixed(2)}`,
    });
  };

  return (
    <>
      <PageHeader
        title="CGPA Calculator"
        description="Calculate your CGPA based on course credits and grades as per VIT standards."
      />

      <motion.div
        className="glass-card rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm">
            <div className="col-span-5 md:col-span-6">Course Name</div>
            <div className="col-span-3 md:col-span-2">Credits</div>
            <div className="col-span-3 md:col-span-3">Grade</div>
            <div className="col-span-1"></div>
          </div>

          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="grid grid-cols-12 gap-4 items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="col-span-5 md:col-span-6">
                <input
                  type="text"
                  placeholder="Course name"
                  className="w-full px-3 py-2 rounded-md border border-input bg-transparent input-focus-ring"
                  value={course.name}
                  onChange={(e) =>
                    updateCourse(course.id, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <select
                  className="w-full px-3 py-2 rounded-md border border-input bg-transparent input-focus-ring"
                  value={course.credits}
                  onChange={(e) =>
                    updateCourse(course.id, "credits", Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6].map((credit) => (
                    <option key={credit} value={credit}>
                      {credit}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-3 md:col-span-3">
                <select
                  className="w-full px-3 py-2 rounded-md border border-input bg-transparent input-focus-ring"
                  value={course.grade}
                  onChange={(e) =>
                    updateCourse(course.id, "grade", e.target.value)
                  }
                >
                  <option value="S">S (10)</option>
                  <option value="A">A (9)</option>
                  <option value="B">B (8)</option>
                  <option value="C">C (7)</option>
                  <option value="D">D (6)</option>
                  <option value="E">E (5)</option>
                  <option value="F">F (0)</option>
                  <option value="N">N (0)</option>
                </select>
              </div>
              <div className="col-span-1 text-center">
                <button
                  className="text-destructive hover:text-destructive/80 transition-colors"
                  onClick={() => removeCourse(course.id)}
                  aria-label="Remove course"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          <motion.button
            className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            onClick={addCourse}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} className="mr-1" />
            Add Course
          </motion.button>

          <motion.div
            className="pt-6 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center"
              onClick={calculateResult}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalcIcon size={18} className="mr-2" />
              Calculate CGPA
            </motion.button>

            {cgpa !== null && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-medium mb-2">Your CGPA</h3>
                <div className="text-4xl font-bold text-primary">{cgpa.toFixed(2)}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Calculator;
