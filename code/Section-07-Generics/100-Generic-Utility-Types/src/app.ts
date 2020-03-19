interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
    // Partial makes all the elements in the object optional on a temporary basis so that we can build the object step by step
    let courseGoal: Partial<CourseGoal> = {};  
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    // We then have to cast the object to the class type
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
// TypeScript compiler yells as the array is read only
// names.push('Manu');
// names.pop();
