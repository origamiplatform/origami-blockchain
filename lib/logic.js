/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @param {com.origami.platform.EnrollToCourse} enrollToCourse
 * @transaction
 */
async function enrollToCourse(request) {
    let student = request.student;
    let course = request.course;

    if (!course.enrolled) {
        course.enrolled = [];
    }
    if (course.enrolled.includes(student)) {
        throw new Error('Student has already enrolled to this course');
    }

    course.enrolled.push(student);

    // save
    const courseRegistry = await getAssetRegistry('com.origami.platform.Course');
    await courseRegistry.update(course);
}

/**
 * @param {com.origami.platform.CompleteCourse} completeCourse
 * @transaction
 */
async function completeCourse(request) {
    let student = request.student;
    let course = request.course;

    if (!course.completed) {
        course.completed = [];
    }
    if (!course.enrolled.includes(student)) {
        throw new Error('Student has not enrolled to this course');
    }
    if (course.completed.includes(student)) {
        throw new Error('Student has already completed this course');
    }

    course.enrolled.push(student);

    // save
    const courseRegistry = await getAssetRegistry('com.origami.platform.Course');
    await courseRegistry.update(course);
}

/**
 * @param {com.origami.platform.CompleteLecture} completeLecture
 * @transaction
 */
async function completeLecture(request) {
    let student = request.student;
    let lecture = request.lecture;

    if (!lecture.completed) {
        lecture.completed = [];
    }
    if (lecture.completed.includes(student)) {
        throw new Error('Student has already completed this lecture');
    }

    lecture.completed.push(student);
    // save
    const lectureRegistry = await getAssetRegistry('com.origami.platform.Lecture');
    await lectureRegistry.update(lecture);
}
