import { AnswersSortOptions } from "@/types/answer";

export const TAGS_PER_PAGE = 36;
export const USERS_PER_PAGE = 36;
export const ANSWERS_PER_PAGE = 10;
export const QUESTIONS_PER_PAGE = 10;
export const USERS_ANSWERS_PER_PAGE = 20;
export const USERS_QUESTIONS_PER_PAGE = 20;
export const USERS_TAGS_PER_PAGE = 40;
export const SAVED_ITEMS_PER_PAGE = 10;

export const homeTabs = [
    {
        name: "Interesting",
        value: "interesting"
    },
    {
        name: "Bountied",
        value: "bountied"
    },
    {
        name: "Hot",
        value: "hot"
    },
    {
        name: "Week",
        value: "week"
    },
    {
        name: "Month",
        value: "month"
    }
];

export const questionsTabs = [
    {
        name: "Newest",
        value: "newest"
    },
    {
        name: "Active",
        value: "active"
    },
    {
        name: "Bountied",
        value: "bountied"
    },
    {
        name: "Unanswered",
        value: "unanswered"
    },
    {
        name: "More",
        value: "more"
    }
];

export const tagsTabs = [
    {
        name: "Popular",
        value: "popular"
    },
    {
        name: "Name",
        value: "name"
    },
    {
        name: "New",
        value: "new"
    }
];

export const taggedQuestionsTabs = [
    {
        name: "Newest",
        value: "newest"
    },
    {
        name: "Bountied",
        value: "bountied"
    },
    {
        name: "Unanswered",
        value: "unanswered"
    },
    {
        name: "Score",
        value: "score"
    }
];

export const usersTabs = [
    {
        name: "Mature",
        value: "mature"
    },
    {
        name: "New users",
        value: "new-users"
    },
    {
        name: "Voters",
        value: "voters"
    }
];

export const askQuestionInstruction = {
    title: "Writing a good question",
    description: "You're ready to ask a programming-related question and this form will help guide you through the process. Looking to ask a non-programming question? See the topics here to find a relevant site.",
    steps: [
        "Summarize your problem in a one-line title.",
        "Describe your problem in more detail.",
        "Describe what you tried and what you expected to happen.",
        "Add “tags” which help surface your question to members of the community.",
        "Review your question and post it to the site."
    ]
};

export const questionTitle = {
    title: "Title",
    description: "Be specific and imagine you’re asking a question to another person.",
    placeholder: "e.g. Is there an R function for finding the index of an element in a vector?"
};

export const questionDetails = {
    title: "What are the details of your problem?",
    description: "Introduce the problem and expand on what you put in the title. Minimum 20 characters.",
};

export const questionExpectation = {
    title: "What did you try and what were you expecting?",
    description: "Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.",
};

export const questionTags = {
    title: "Tags",
    description: "Add up to 5 tags to describe what your question is about. Start typing to see suggestions.",
    placeholder: "e.g. (asp.net-mvc sql-server ios)"
};

export const questionReview = {
    title: "Review questions already on Code Overflow to see if your question is a duplicate.",
    description: "Clicking on these questions will open them in a new tab for you to review. Your progress here will be saved so you can come back and continue.",
    placeholder: "Do any of these posts answer your question?"
};

export const answersSortOptions: AnswersSortOptions = [
    {
        name: "Highest score (default)",
        value: "highest-score"
    },
    {
        name: "Date modified (newest first)",
        value: "newest-first"
    },
    {
        name: "Date created (oldest first)",
        value: "oldest-first"
    }
];

export const userActivityTabs = [
    {
        name: "Summary",
        value: "summary"
    },
    {
        name: "Answers",
        value: "answers"
    },
    {
        name: "Questions",
        value: "questions"
    },
    {
        name: "Tags",
        value: "tags"
    },
    {
        name: "Votes",
        value: "votes"
    },
];

export const userSummaryAnswersTabs = [
    {
        name: "Score",
        value: "score"
    },
    {
        name: "Newest",
        value: "newest"
    }
];

export const userSummaryQuestionsTabs = [
    {
        name: "Score",
        value: "score"
    },
    {
        name: "Newest",
        value: "newest"
    },
    {
        name: "Views",
        value: "views"
    }
];

export const userSummaryTagsTabs = [
    {
        name: "Used",
        value: "used"
    },
    {
        name: "Watched",
        value: "watched"
    },
    {
        name: "Ignored",
        value: "ignored"
    },
    {
        name: "Created",
        value: "created"
    }
];

export const userAllSavesTabs = [
    {
        name: "Score",
        value: "score"
    },
    {
        name: "Views",
        value: "views"
    },
    {
        name: "Newest",
        value: "newest"
    }
];