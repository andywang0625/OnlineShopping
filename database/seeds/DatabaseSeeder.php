<?php
/*
 * @Author: Kanade
 * @Date: 2020-03-06 06:07:00
 * @LastEditTime: 2020-05-19 06:12:21
 * @Description:
 */

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class, 300)->create();
        factory(\App\Post::class, 10000)->create();
    }
}
