***Settings***
Library seleniumLibrary
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
    First Follower is anakinnet
    Second Follower is getlinks
    Third Follower is dev-getlinks
***Keywords***
Open Browser and Go to Find Followers's Site
    Open Browser    ${URL}    ${BROWSER}
Search by Pichaya's name
    Input Text    id=celebrity    ${CELEBRITY}
Results should be 3 Followers
    ${count} =	Get Element Count	class:follower
    Should Be True	${count} > 2	
First Follower is anakinnet
    Wait Until Element Contains    followers    anakinnet
Second Follower is getlinks
    Wait Until Element Contains    followers    getlinks
Third Follower is dev-getlinks
    Wait Until Element Contains    followers    dev-getlinks