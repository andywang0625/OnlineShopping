<?php
/*
 * @Author: Kanade
 * @Date: 2019-09-26 18:09:47
 * @LastEditTime: 2020-05-17 13:02:26
 * @Description:
 */

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title'=>$faker->word,
        'description'=>$faker->paragraph,
        'price'=>rand(10, 100000),
        'number'=>rand(0, 1000),
        'userid'=>rand(1,20),
    ];
});
