<?php

function getUsers ($connect)
{
    $query = mysqli_query($connect, "SELECT user.name, user.surname, user.mail, user.role, additional_information.tel FROM user LEFT JOIN additional_information ON user.id = additional_information.id_user");
    $data = [];
    while($result = mysqli_fetch_assoc($query))
    {
        $data[] = $result;
    }
    echo json_encode($data);
}

function getUser ($connect, $id)
{   
    $query = mysqli_query($connect, "SELECT user.name, user.surname, user.mail, user.role, additional_information.tel FROM user, additional_information WHERE user.id = $id AND user.id = additional_information.id_user");
    if(mysqli_num_rows($query) === 0)
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных с таким id нет"
        ];
        echo json_encode($data);
    }
    else 
    {
        $query = mysqli_fetch_assoc($query);
        echo json_encode($query);
    }
}


function getDocuments ($connect)
{
    $query = mysqli_query($connect, "SELECT * FROM `document`");
    $data = [];
    while($result = mysqli_fetch_assoc($query))
    {
        $data[] = $result;
    }
    echo json_encode($data);
}

function getDocument ($connect, $id)
{   
    $query = mysqli_query($connect, "SELECT * FROM `document` WHERE `id_user` = '$id'");
    if(mysqli_num_rows($query) === 0)
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных для пользователя нет"
        ];
        echo json_encode($data);
    }
    else 
    {
        $data = [];
        while($result = mysqli_fetch_assoc($query))
        {
            $data[] = $result;
        }
        echo json_encode($data);
    }
}

function getEducation ($connect, $id)
{   
    $query = mysqli_query($connect, "SELECT * FROM `education` WHERE `id_user` = '$id' ORDER BY `end_year` DESC");
    if(mysqli_num_rows($query) === 0)
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных для пользователя нет"
        ];
        echo json_encode($data);
    }
    else 
    {
        $data = [];
        while($result = mysqli_fetch_assoc($query))
        {
            $data[] = $result;
        }
        echo json_encode($data);
    }
}

function getQuality ($connect, $id)
{   
    $query = mysqli_query($connect, "SELECT * FROM `quality` WHERE `id_user` = '$id'");
    if(mysqli_num_rows($query) === 0)
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных для пользователя нет"
        ];
        echo json_encode($data);
    }
    else 
    {
        $data = [];
        while($result = mysqli_fetch_assoc($query))
        {
            $data[] = $result;
        }
        echo json_encode($data);
    }
}

function getWork ($connect, $id)
{   
    $query = mysqli_query($connect, "SELECT * FROM `work` WHERE `id_user` = '$id'");
    if(mysqli_num_rows($query) === 0)
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных для пользователя нет"
        ];
        echo json_encode($data);
    }
    else 
    {
        $data = [];
        while($result = mysqli_fetch_assoc($query))
        {
            $data[] = $result;
        }
        echo json_encode($data);
    }
}

function getMessages ($connect)
{
    session_start();
    $session = $_SESSION['id_user'];
    if(empty($session)) 
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных сессии нет"
        ];
        echo json_encode($data);
    }
    else
    {

        $query = mysqli_query($connect, "SELECT user.id as 'user_id', message.id as 'message_id' FROM messages INNER JOIN user ON user.id = messages.id_user INNER JOIN message ON message.id = messages.id_message WHERE messages.id_user = $session");
        $data = [];
        $message_id = [];
        while($result = mysqli_fetch_assoc($query))
        {   
            if(!in_array($result['message_id'], $message_id)){
                $message_id[] = $result['message_id'];
            } 
        }
        foreach ($message_id as $value)
        {
            $query = mysqli_query($connect, "SELECT messages.message, messages.date, user.name, user.surname, user.id as 'user_id', message.id as 'message_id' FROM messages INNER JOIN user ON user.id = messages.id_user INNER JOIN message ON message.id = messages.id_message WHERE messages.id_message = $value ORDER BY messages.date DESC LIMIT 1");
            $query = mysqli_fetch_assoc($query);
            $data[] = $query;
        }
        echo json_encode($data);
    }
}
function getMessage ($connect, $id)
{   
    $query = mysqli_query($connect, "SELECT messages.message, messages.date, user.name, user.surname, user.id as 'user_id', message.id as 'message_id' FROM messages INNER JOIN user ON user.id = messages.id_user INNER JOIN message ON message.id = messages.id_message WHERE message.id = $id");
    if(mysqli_num_rows($query) === 0)
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных для пользователя нет"
        ];
        echo json_encode($data);
    }
    else 
    {
        $data = [];
        while($result = mysqli_fetch_assoc($query))
        {
            $data[] = $result;
        }
        echo json_encode($data);
    }
}

function getEvents ($connect)
{
    $query = mysqli_query($connect, "SELECT * FROM `events`");
    $data = [];
    while($result = mysqli_fetch_assoc($query))
    {
        $data[] = $result;
    }
    echo json_encode($data);
}

function getSession ($connect)
{
    session_start();
    if(isset($_SESSION)) echo json_encode($_SESSION);
    else 
    {
        http_response_code(404);
        $data = 
        [
            "status" => false,
            "message" => "Данных сессии нет"
        ];
        echo json_encode($data);
    }
}

function addUser ($connect, $data)
{
    $name = $data['name'];
    $surname = $data['surname'];
    $mail = $data['mail'];
    $password = $data['password'];

    $query = mysqli_query($connect, "INSERT INTO `user` (`name`, `surname`, `mail`, `password`) VALUES ('$name', '$surname', '$mail', '$password')");
    http_response_code(201);
    $data = 
        [
            "status" => true,
            "user_id" => mysqli_insert_id($connect),
            "message" => "Данные добавленны"
        ];
    echo json_encode($data);
}

function updateUser ($connect, $id, $data)
{
    $name = $data['name'];
    $surname = $data['surname'];
    $mail = $data['mail'];
    $password = $data['password'];
    if(isset($data['role'])) $role = $data['role']; else $role = null;

    $query = mysqli_query($connect, "UPDATE `user` SET `name` = '$name', `surname` = '$surname', `mail` = '$mail', `password` = '$password', `role` = '$role' WHERE `user`.`id` = '$id'");
    http_response_code(200);
    $data = 
        [
            "status" => true,
            "message" => "Данные обновлены"
        ];
    echo json_encode($data);
}

function deleteUser ($connect, $id)
{
    $query = mysqli_query($connect, "DELETE FROM `user` WHERE `user`.`id` = '$id'");
    http_response_code(200);
    $data = 
        [
            "status" => true,
            "message" => "Данные удалены"
        ];
    echo json_encode($data);
}

function searchUser ($connect, $data)
{   $thisSession = false;
    if(isset($data['mail']) && isset($data['password']))
    { 
        $mail = $data['mail']; 
        $password = $data['password']; 
        $query = mysqli_query($connect, "SELECT * FROM `user` WHERE `mail` LIKE '$mail' AND `password` LIKE '$password'");
        $thisSession = true;
    }
    else if(isset($data['name']) && isset($data['role']))
    { 
        $name = $data['name']; 
        $role = $data['role'];
        if(!is_int($role) && $name != "") $query = mysqli_query($connect, "SELECT * FROM `user` WHERE `name` LIKE '%$name%' OR `surname` LIKE '%$name%'");
        else if (is_int($role) && $role >= 0 && $name != "") $query = mysqli_query($connect, "SELECT * FROM `user` WHERE (`name` LIKE '%$name%' OR `surname` LIKE '%$name%') AND `role` LIKE  $role ");
        else if (is_int($role) &&  $role >= 0 && $name == "") $query = mysqli_query($connect, "SELECT * FROM `user` WHERE `role` LIKE  $role ");
        else $query = mysqli_query($connect, "SELECT * FROM `user`");
    }
    else if(isset($data['mail']))
    {
        $mail = $data['mail']; 
        $query = mysqli_query($connect, "SELECT * FROM `user` WHERE `mail` LIKE '$mail'");
    }
    
    //$name = $data['name'];
    //$query = mysqli_query($connect, "SELECT * FROM `user` WHERE `name` LIKE '%$name%'");
    
    if(mysqli_num_rows($query) === 0){
        http_response_code(404);
        $data = 
            [
                "status" => false,
                "message" => "Данные не найдены"
            ];
        echo json_encode($data);
    }
    else if($thisSession)
    {
        $query = mysqli_fetch_assoc($query);
        session_start();
        $_SESSION['id_user'] = $query['id'];
        echo json_encode($_SESSION);
    }
    else 
    {
        $data = [];
        while($result = mysqli_fetch_assoc($query))
        {
            $data[] = $result;
        }
        echo json_encode($data);
    }

}