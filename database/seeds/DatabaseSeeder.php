<?php
/*
 * @Author: Kanade
 * @Date: 2020-03-06 06:07:00
 * @LastEditTime: 2020-05-17 13:02:54
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
        factory(\App\User::class, 20)->create();
        factory(\App\Post::class, 80)->create();
    }
}
