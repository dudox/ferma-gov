<?php

use App\GeoRegions;
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
        $this->call([
            UsersTableSeeder::class,
            DamageTypesSeeder::class,
            DamageStatusSeeder::class,
            DamageEntriesSeeder::class,
            DamageScreensSeeder::class,
            GeoRegionsSeeder::class,
            RoadSeeder::class
        ]);
    }
}
