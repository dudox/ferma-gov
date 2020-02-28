<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            [
                'name' => 'Emmanuel Ogolekwu',
                'email' => 'emmanuel@mayapro1.com',
                'email_verified_at' => Carbon\Carbon::now(),
                'password' => Hash::make('my33pesd#'),
                'created_at' => Carbon\Carbon::now(),
            ]
        ]);
    }
}
