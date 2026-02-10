import { Sheet } from '@/types/sheet';

export const sampleSheet: Sheet = {
  id: 'strivers-a2z-dsa-sheet',
  title: 'Strivers A2Z DSA Sheet',
  description: 'This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured manner.',
  topics: [
    {
      id: 'topic-arrays',
      title: 'Arrays',
      subTopics: [
        {
          id: 'sub-arrays-basics',
          title: 'Array Basics',
          questions: [
            { id: 'q-1', title: 'Set Matrix Zeroes', difficulty: 'medium', link: 'https://leetcode.com/problems/set-matrix-zeroes/', completed: false },
            { id: 'q-2', title: "Pascal's Triangle", difficulty: 'easy', link: 'https://leetcode.com/problems/pascals-triangle/', completed: true },
            { id: 'q-3', title: 'Next Permutation', difficulty: 'medium', link: 'https://leetcode.com/problems/next-permutation/', completed: false },
            { id: 'q-4', title: 'Kadane\'s Algorithm', difficulty: 'medium', link: 'https://leetcode.com/problems/maximum-subarray/', completed: false },
            { id: 'q-5', title: 'Sort Colors (Dutch National Flag)', difficulty: 'medium', link: 'https://leetcode.com/problems/sort-colors/', completed: true },
            { id: 'q-6', title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', completed: false },
          ],
        },
        {
          id: 'sub-arrays-advanced',
          title: 'Array Advanced',
          questions: [
            { id: 'q-7', title: 'Rotate Matrix', difficulty: 'medium', link: 'https://leetcode.com/problems/rotate-image/', completed: false },
            { id: 'q-8', title: 'Merge Overlapping Intervals', difficulty: 'medium', link: 'https://leetcode.com/problems/merge-intervals/', completed: false },
            { id: 'q-9', title: 'Find the Duplicate Number', difficulty: 'medium', link: 'https://leetcode.com/problems/find-the-duplicate-number/', completed: true },
            { id: 'q-10', title: 'Repeat and Missing Number', difficulty: 'hard', link: '', completed: false },
            { id: 'q-11', title: 'Inversion of Array (Merge Sort)', difficulty: 'hard', link: '', completed: false },
          ],
        },
      ],
    },
    {
      id: 'topic-linked-list',
      title: 'Linked List',
      subTopics: [
        {
          id: 'sub-ll-basics',
          title: 'Singly Linked List',
          questions: [
            { id: 'q-12', title: 'Reverse a Linked List', difficulty: 'easy', link: 'https://leetcode.com/problems/reverse-linked-list/', completed: true },
            { id: 'q-13', title: 'Middle of the Linked List', difficulty: 'easy', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', completed: false },
            { id: 'q-14', title: 'Merge Two Sorted Lists', difficulty: 'easy', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', completed: false },
            { id: 'q-15', title: 'Remove N-th Node From End', difficulty: 'medium', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', completed: false },
            { id: 'q-16', title: 'Add Two Numbers', difficulty: 'medium', link: 'https://leetcode.com/problems/add-two-numbers/', completed: false },
            { id: 'q-17', title: 'Delete Node in a Linked List', difficulty: 'medium', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', completed: true },
          ],
        },
        {
          id: 'sub-ll-advanced',
          title: 'Advanced Linked List',
          questions: [
            { id: 'q-18', title: 'Detect Cycle in Linked List', difficulty: 'easy', link: 'https://leetcode.com/problems/linked-list-cycle/', completed: false },
            { id: 'q-19', title: 'Flatten a Linked List', difficulty: 'medium', link: '', completed: false },
            { id: 'q-20', title: 'Rotate a Linked List', difficulty: 'medium', link: 'https://leetcode.com/problems/rotate-list/', completed: false },
            { id: 'q-21', title: 'Copy List with Random Pointer', difficulty: 'medium', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', completed: false },
          ],
        },
      ],
    },
    {
      id: 'topic-greedy',
      title: 'Greedy Algorithm',
      subTopics: [
        {
          id: 'sub-greedy-basics',
          title: 'Greedy Problems',
          questions: [
            { id: 'q-22', title: 'N Meetings in One Room', difficulty: 'easy', link: '', completed: false },
            { id: 'q-23', title: 'Minimum Platforms', difficulty: 'medium', link: '', completed: false },
            { id: 'q-24', title: 'Job Sequencing Problem', difficulty: 'medium', link: '', completed: false },
            { id: 'q-25', title: 'Fractional Knapsack', difficulty: 'medium', link: '', completed: true },
            { id: 'q-26', title: 'Assign Cookies', difficulty: 'easy', link: 'https://leetcode.com/problems/assign-cookies/', completed: false },
          ],
        },
      ],
    },
    {
      id: 'topic-recursion',
      title: 'Recursion & Backtracking',
      subTopics: [
        {
          id: 'sub-recursion-basics',
          title: 'Recursion Basics',
          questions: [
            { id: 'q-27', title: 'Subset Sums', difficulty: 'easy', link: '', completed: false },
            { id: 'q-28', title: 'Subsets II', difficulty: 'medium', link: 'https://leetcode.com/problems/subsets-ii/', completed: false },
            { id: 'q-29', title: 'Combination Sum', difficulty: 'medium', link: 'https://leetcode.com/problems/combination-sum/', completed: false },
            { id: 'q-30', title: 'Combination Sum II', difficulty: 'medium', link: 'https://leetcode.com/problems/combination-sum-ii/', completed: false },
            { id: 'q-31', title: 'Palindrome Partitioning', difficulty: 'medium', link: 'https://leetcode.com/problems/palindrome-partitioning/', completed: false },
          ],
        },
        {
          id: 'sub-backtracking',
          title: 'Backtracking',
          questions: [
            { id: 'q-32', title: 'N-Queens', difficulty: 'hard', link: 'https://leetcode.com/problems/n-queens/', completed: false },
            { id: 'q-33', title: 'Sudoku Solver', difficulty: 'hard', link: 'https://leetcode.com/problems/sudoku-solver/', completed: false },
            { id: 'q-34', title: 'M-Coloring Problem', difficulty: 'medium', link: '', completed: false },
            { id: 'q-35', title: 'Rat in a Maze', difficulty: 'medium', link: '', completed: false },
            { id: 'q-36', title: 'Word Break', difficulty: 'medium', link: 'https://leetcode.com/problems/word-break/', completed: false },
          ],
        },
      ],
    },
    {
      id: 'topic-binary-search',
      title: 'Binary Search',
      subTopics: [
        {
          id: 'sub-bs-1d',
          title: '1D Binary Search',
          questions: [
            { id: 'q-37', title: 'Binary Search', difficulty: 'easy', link: 'https://leetcode.com/problems/binary-search/', completed: true },
            { id: 'q-38', title: 'Search in Rotated Sorted Array', difficulty: 'medium', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', completed: false },
            { id: 'q-39', title: 'Median of Two Sorted Arrays', difficulty: 'hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', completed: false },
            { id: 'q-40', title: 'Single Element in Sorted Array', difficulty: 'medium', link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', completed: false },
            { id: 'q-41', title: 'Search Insert Position', difficulty: 'easy', link: 'https://leetcode.com/problems/search-insert-position/', completed: true },
          ],
        },
      ],
    },
    {
      id: 'topic-dp',
      title: 'Dynamic Programming',
      subTopics: [
        {
          id: 'sub-dp-1d',
          title: '1D DP',
          questions: [
            { id: 'q-42', title: 'Climbing Stairs', difficulty: 'easy', link: 'https://leetcode.com/problems/climbing-stairs/', completed: true },
            { id: 'q-43', title: 'Frog Jump', difficulty: 'medium', link: '', completed: false },
            { id: 'q-44', title: 'House Robber', difficulty: 'medium', link: 'https://leetcode.com/problems/house-robber/', completed: false },
          ],
        },
        {
          id: 'sub-dp-2d',
          title: '2D DP',
          questions: [
            { id: 'q-45', title: 'Unique Paths', difficulty: 'medium', link: 'https://leetcode.com/problems/unique-paths/', completed: false },
            { id: 'q-46', title: 'Minimum Path Sum', difficulty: 'medium', link: 'https://leetcode.com/problems/minimum-path-sum/', completed: false },
            { id: 'q-47', title: 'Edit Distance', difficulty: 'hard', link: 'https://leetcode.com/problems/edit-distance/', completed: false },
            { id: 'q-48', title: 'Longest Common Subsequence', difficulty: 'medium', link: 'https://leetcode.com/problems/longest-common-subsequence/', completed: false },
            { id: 'q-49', title: '0/1 Knapsack', difficulty: 'medium', link: '', completed: false },
          ],
        },
      ],
    },
  ],
};
