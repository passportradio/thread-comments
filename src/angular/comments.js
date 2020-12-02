import angular from "angular";
import React from "react";
import ReactDOM from "react-dom";
import Count from "../react/Count";
import data from './mock';
import { makeFlatStructure, makeNestedStructure } from './utils';
import { v4 as uuidv4 } from "uuid";

const angularApp = angular.module("angularApp", []);

angularApp.controller("CommentsController", ["$scope", ($scope) => {
  const vm = $scope.vm;

  vm.newCommentText = "";
  vm.initialComments = [];
  vm.nestedComments = [];
  vm.loading = false

  vm.getComments = () => {
    vm.loading = true;

    const request1 = new Promise((resolve, reject) => {
      setTimeout(resolve, 300);
    });

    const request2 = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });

    const request3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });

    Promise.all([request1, request2, request3]).then(() => {
      vm.loading = false;
      vm.initialComments = data;
      vm.nestedComments = makeNestedStructure(vm.initialComments);
      $scope.$apply();
    });
  }

  vm.addComment = (id) => {
    if (!vm.newCommentText[id]) {
      alert("The comment can't be empty");
      return;
    }

    const comment = {
      text: vm.newCommentText[id],
      id: uuidv4(),
      parent: id || null,
    };

    vm.initialComments = [...vm.initialComments, comment];
    vm.newCommentText = "";
  };

  vm.deleteComment = (id) => {
    const removeElement = (array, id) => {
      return array.some((item, index, array) => item.id === id
          ? array.splice(index, 1)
          : removeElement(item.children || [], id)
      );
    }

    removeElement(vm.nestedComments, id)
    vm.initialComments = makeFlatStructure(vm.nestedComments);
  };

  $scope.$watch("vm.initialComments", (newComments) => {
    vm.nestedComments = makeNestedStructure(vm.initialComments);

    if (angular.isDefined(newComments)) {
      ReactDOM.render(
        <Count comments={newComments} />,
        document.getElementById("react-count")
      );
    }
  }, false);
}]);
