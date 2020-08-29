import { Queue } from '@dinosanjo/data-structures';
import { throwIfNotArray } from '../utility/arg-checking';

// You are given a list of projects and a list
// of dependencies, which is a list of pairs of
// projects, where the second project is dependent
// on the first project. All of a project's
// dependencies must be built before the project is.
// Find a build order that will allow the projects
// to be built. If there is no valid build order,
// return an error.

// Note: a 'base project' is one that does not have
// dependents
const findBaseProjects = (projects, dependencies) => {
  const dependencyProjects = dependencies
      .map(([dp]) => dp)
      .filter((dp, i, dps) => dps.indexOf(dp) === i);
  const baseProjects = projects.filter(p => !dependencyProjects.includes(p));
  return baseProjects;
};

const throwIfCircularDependenciesDetected = (dependencies) => {
  for (const [dependency, dependent] of dependencies) {
    const searchQueue = new Queue();
    searchQueue.enqueue(dependency);
    while (searchQueue.size() !== 0) {
      const searchDependent = searchQueue.dequeue();
      const searchDependentDependencies = dependencies.filter(([_, sdt]) => searchDependent === sdt);
      for (const [sdy, _] of searchDependentDependencies) {
        if (dependent === sdy) {
          throw 'Circular depdency found';
        }
        searchQueue.enqueue(sdy);
      }
    }
  }
};

const getDependencyProjects = (project, dependencies) => {
  return dependencies
      .filter(([_, dependent]) => project === dependent)
      .map(([dependency, _]) => dependency);
};

const insertBefore = (array, referenceValue, value) => {
  array.splice(array.indexOf(referenceValue), 0, value);
};

const removeAt = (array, index) => {
  array.splice(index, 1);
};

const insertOrMoveDependency = (dependent, dependency, buildOrder) => {
  if (!buildOrder.includes(dependency)) {
    insertBefore(buildOrder, dependent, dependency);
  } else {
    const dependentIndex = buildOrder.indexOf(dependent);
    const dependencyIndex = buildOrder.indexOf(dependency);
    if (dependencyIndex >= dependentIndex - 1) {
      removeAt(buildOrder, dependencyIndex);
      insertBefore(buildOrder, dependent, dependency);
    }
  }
};

const calculateBuildOrder = (project, dependencies, buildOrder, lastProject = null) => {
  if (lastProject === null) {
    buildOrder.push(project);
  } else {
    insertOrMoveDependency(lastProject, project, buildOrder);
  }
  const dependencyProjects = getDependencyProjects(project, dependencies);
  for (const dp of dependencyProjects) {
    calculateBuildOrder(dp, dependencies, buildOrder, project);
  }
};

export const getBuildOrder = (projects, dependencies) => {
  throwIfNotArray(projects);
  throwIfNotArray(dependencies);
  throwIfCircularDependenciesDetected(dependencies);
  const baseProjects = findBaseProjects(projects, dependencies);
  const buildOrder = [];
  for (const project of baseProjects) {
    calculateBuildOrder(project, dependencies, buildOrder);
  }
  return buildOrder;
};
