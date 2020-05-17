<?php
/*
 * @Author: Kanade
 * @Date: 2020-03-06 06:07:00
 * @LastEditTime: 2020-05-17 12:01:13
 * @Description:
 */

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->userName(),
        'email' => $faker->unique()->safeEmail,
        'password' => sha1('passwd'),
    ];
});
