<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title'=>$faker->word,
        'description'=>$faker->paragraph,
        'price'=>rand(10, 1000),
        'number'=>rand(0, 200),
    ];
});
