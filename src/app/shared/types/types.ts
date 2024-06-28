
export interface IOption {
    label: string;
    value: string;
    tag?: string;
    display: boolean;
}
export const formConfig1 = {
    "data": [
        {
            "id": "1",
            "type": "select",
            "label": "Select Course",
            "name": "selectCourse",
            "defaultValue": "javascript",
            "options": [
                {
                    "label": "Javascript",
                    "value": "javascript",
                    "display": true
                },
            
                {
                    "label": "Java",
                    "value": "java",
                    "display": true
                },
            ]
        },
        {
            "id": "2",
            "type": "select",
            "name": "selectFramework",
            "label": "Select Framework",
            "options": [
               
                {
                    "label": "SpringBoot",
                    "tag": "java",
                    "value": "springBoot",
                    "display": false
                },
                {
                    "label": "Maven",
                    "tag": "java",
                    "value": "maven",
                    "display": false

                },
                {
                    "label": "Apache",
                    "tag": "java",
                    "value": "apache",
                    "display": false
                },
                {
                    "label": "Angular",
                    "tag": "javascript",
                    "value": "angular",
                    "display": false
                },
                {
                    "label": "Vue",
                    "tag": "javascript",
                    "value": "vue",
                    "display": false
                },
                {
                    "label": "React",
                    "tag": "javascript",
                    "value": "react",
                    "display": false
                },
            ]
        },
        {
            "id": "3",
            "type": "text",
            "name": "firstName",
            "label": "First Name"
        }
    ]
}
export const formConfig2 = {
    "data": [
        {
            "id": "1",
            "type": "text",
            "name": "firstName",
            "label": "First Name"
        },
        {
            "id": "2",
            "type": "text",
            "name": "lastName",
            "label": "Last Name"
        },
    ]
}