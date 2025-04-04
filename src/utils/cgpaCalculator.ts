
type GradePoint = {
  [key: string]: number;
};

// VIT Grade points mapping
export const gradePoints: GradePoint = {
  "S": 10,
  "A": 9,
  "B": 8,
  "C": 7,
  "D": 6,
  "E": 5,
  "F": 0,
  "N": 0
};

export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export const calculateCGPA = (courses: Course[]): number => {
  let totalCredits = 0;
  let totalGradePoints = 0;

  for (const course of courses) {
    const credits = course.credits;
    const gradePoint = gradePoints[course.grade] || 0;
    
    totalCredits += credits;
    totalGradePoints += credits * gradePoint;
  }

  // Return 0 if no credits to avoid division by zero
  if (totalCredits === 0) {
    return 0;
  }

  return parseFloat((totalGradePoints / totalCredits).toFixed(2));
};

export const calculateImprovedCGPA = (
  currentCGPA: number,
  currentCredits: number,
  improvementCourses: Course[]
): number => {
  let totalNewCredits = 0;
  let totalNewGradePoints = 0;

  for (const course of improvementCourses) {
    const credits = course.credits;
    const gradePoint = gradePoints[course.grade] || 0;
    
    totalNewCredits += credits;
    totalNewGradePoints += credits * gradePoint;
  }

  // Current total grade points
  const currentTotalPoints = currentCGPA * currentCredits;
  
  // Calculate the new total
  const newTotalCredits = currentCredits + totalNewCredits;
  const newTotalPoints = currentTotalPoints + totalNewGradePoints;

  // Return current CGPA if no new credits
  if (newTotalCredits === 0) {
    return currentCGPA;
  }

  return parseFloat((newTotalPoints / newTotalCredits).toFixed(2));
};

export const calculateRequiredGPA = (
  targetCGPA: number,
  currentCGPA: number,
  currentCredits: number,
  remainingCredits: number
): number => {
  // Calculate total grade points needed for target CGPA
  const totalCredits = currentCredits + remainingCredits;
  const totalPointsNeeded = targetCGPA * totalCredits;
  
  // Calculate current total points
  const currentPoints = currentCGPA * currentCredits;
  
  // Calculate points needed in remaining courses
  const pointsNeeded = totalPointsNeeded - currentPoints;
  
  // Calculate required GPA for remaining courses
  const requiredGPA = pointsNeeded / remainingCredits;
  
  return parseFloat(requiredGPA.toFixed(2));
};
