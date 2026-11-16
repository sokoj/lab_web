const skills = ['Java', 'HTML', 'CSS', 'JavaScript', 'Python', 'C'];

function Skills() {
  return (
    <section className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-t-4 border-sky-500 hover:scale-105 transition-transform">
      <h2 className="text-2xl font-bold text-sky-600 dark:text-sky-300 mb-3">Навички</h2>
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="px-4 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100 font-medium hover:bg-sky-500 hover:text-white transition-colors"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
