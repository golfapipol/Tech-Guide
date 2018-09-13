***Settings***
Library    SeleniumLibrary
Suite Teardown    Close Browser
****Variables***
${HOST}    http://localhost:3000
${URL}    ${HOST}/
${BROWSER}    chrome
${CELEBRITY}    Pichaya
***Test Cases***
Find Followers of Pichaya
    Open Browser and Go to Find Followers's Site
    Search by Pichaya's name
    Results should be 3 Followers
    Follower is anakinnet
    Follower is Tedev555
    Follower is pleum
***Keywords***
Open Browser and Go to Find Followers's Site
    Open Browser    ${URL}    ${BROWSER}
Search by Pichaya's name
    Input Text    id=celebrity    ${CELEBRITY}
    Click Button    id=submit
Results should be 3 Followers
    Wait Until Element Is Visible    class:follower
    ${count} =	Get Element Count	class:follower
    Should Be True	${count} > 2	
Follower is anakinnet
    Wait Until Element Contains    followers    anakinnet
Follower is Tedev555
    Wait Until Element Contains    followers    Tedev555
Follower is pleum
    Wait Until Element Contains    followers    pleum