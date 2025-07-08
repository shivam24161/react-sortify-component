// Return classname
interface ClassesI {
  [className: string]: any;
}
const getClassNames = (classes: ClassesI) => {
  return Object.keys(classes)
    .filter((className) => classes[className])
    .join(" ");
};
export default getClassNames;
