import ChatBot from 'react-simple-chatbot';
import * as React from 'react'
import { ThemeProvider } from 'styled-components';

export default class MyChatBot extends React.Component<{}, {}>{

    public render(){
        const theme = {
            background: "#696969",
            fontFamily: "Helvetica",
            botBubbleColor: '#FFFFFF',
            botFontColor: '#000000',
            userBubbleColor: '#FFFFFF',
            userFontColor: '#000000',
            headerBgColor: '#FFFFFF',
        }
        return(
            <ThemeProvider theme = {theme}>
            <ChatBot floating={true}
            steps={[
                {
                  id: '1',
                  message: 'Welcome to Movie Bank, how can I assist you?',
                  trigger: '2',
                },
                {
                    id: '2',
                    options: [
                        { value: 1, label: 'What does this website do?', trigger: '3'},
                        { value: 2, label: 'How do I add a movie?', trigger: '4'},
                        { value: 3, label: 'How do I search for a movie?', trigger: '5'},
                        { value: 4, label: 'How do I add a review to a movie?', trigger: '6' }
                    ]
                },
                {
                    id: '3',
                    message: 'This website functions as a database that allows users to store information about movies. There is also the ability to leave reviews for movies.',
                    trigger: '2'
                },
                {
                    id: '4',
                    message: 'If you want to add a movie, make sure to login using Facebook first. Once you have done that click the Add Movie button on the top right of the screen and fill in the details of the movie.',
                    trigger: '2'
                },
                {
                    id: '5',
                    message: 'To search for a movie type the title of any movie that you want to look for in the search bar at the top of the website, if the movie is found the list of movies should update',
                    trigger: '2'
                },
                {
                    id:'6',
                    message: 'To leave a review, login with Facebook first. Then click on a movie you want to review, click on the bottom right speech bubbles, then the + button to add a review.',
                    trigger: '2'
                }
            ]}
            />
            </ThemeProvider>
        )
    }
}