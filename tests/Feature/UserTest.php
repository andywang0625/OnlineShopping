<?php
/*
 * @Author: Kanade
 * @Date: 2020-05-16 14:38:54
 * @LastEditTime: 2020-05-17 13:36:15
 * @Description:
 */

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_login_with_none_param()
    {
        $this->json("POST", "api/login_request")->assertStatus(401)->assertJson(["error"=> "User not found"]);
    }

    /** @test */
    public function user_register()
    {
        $this->json("POST", 'api/register_request', [
            "name" => "test",
            "email" => "test@test.com",
            "password" => "Passwd1"
        ])->assertStatus(200);
    }

    /** @test */
    public function user_login_with_email(){
        $user = factory(User::class)->create();
        $this->json("POST", "api/login_request", [
            "name" => $user->email,
            'password' => 'passwd',
        ])->assertStatus(200)->assertJsonStructure([
            'error',
            'token'
        ])->assertJson([
            'error' => null,
        ]);
    }

    /** @test */
    public function user_loged_in_with_none_param()
    {
        $user = factory(User::class)->create(["api_token"=>"token"]);
        $this->json("POST", "api/verify_login")
        ->assertStatus(401)
        ->assertJson(["status"=> false]);
    }

    /** @test */
    public function user_loged_in()
    {
        $user = $this->CreateTestUser();
        $this->json("POST", "api/verify_login", [
            "token" => "token",
        ])->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'name',
            'email',
            'id',
        ])->assertJson(["status"=>true]);
    }

    /** @test */
    public function user_edit()
    {
        $user = $this->CreateTestUser();
        $this->json("POST", "api/user/edit", [
            'name' => "TestName",
            'email' => "testemail@test.com",
            'password' => "Passwd1Test",
            'token' => "token",
        ])->assertStatus(200)->assertJson(["error"=>null]);

        $this->json("POST", "api/verify_login", [
            "token" => "token",
        ])->assertStatus(200)
        ->assertJson([
            'status'=>true,
            'name'=>"TestName",
            'email'=>"testemail@test.com",
        ]);
        $this->assertTrue(User::where("token", "token")->first()->password=="fc7e26dfd4f863bcc7902fbc393f8911484c706d");
    }

    /** @test */
    public function user_edit_without_password()
    {
        $user = $this->CreateTestUser();
        $this->json("POST", "api/user/edit", [
            'name' => "TestName",
            'email' => "testemail@test.com",
            'token' => "token",
        ])->assertStatus(200)->assertJson(["error"=>null]);

        $this->json("POST", "api/verify_login", [
            "token" => "token",
        ])->assertStatus(200)
        ->assertJson([
            'status'=>true,
            'name'=>"TestName",
            'email'=>"testemail@test.com",
        ]);
        $this->assertTrue(User::where("token", "token")->first()->password=="30274c47903bd1bac7633bbf09743149ebab805f");
    }

    /** @test */
    public function user_edit_none_param()
    {
        $user = $this->CreateTestUser();
        $this->json("POST", "api/user/edit")
        ->assertStatus(406)
        ->assertJson(["error"=>"The name field is required."]);

        $this->json("POST", "api/verify_login", [
            "token" => "token",
        ])->assertStatus(200)
        ->assertJson(["status"=>true]);
        $this->assertTrue(User::where("token", "token")->first()->password=="30274c47903bd1bac7633bbf09743149ebab805f");
    }

    public function CreateTestUser()
    {
        return factory(User::class)->create(["api_token"=>"token"]);
    }

}
