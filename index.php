<?php

/** Максимальное количество посещений за определенное время */
const MAX_VISITS = 5;
/** Период в секундах, в который определяется предполагаемая атака ddos  */
const PERIOD_CHECK_SEC = 60;

$memcache = memcache_connect('localhost', 11211);
//$memcache->delete('userVisits');exit;

$userIPKey = 'userIP' . $_SERVER['SERVER_ADDR'];

$userVisits = $memcache->get('userVisits');
// если в кеше нет инфы по визитам, то создаем и сохраняем время визита в кеш
if (!$userVisits) {
	$userVisits[$userIPKey] = [microtime(true)];
	$memcache->set('userVisits', $userVisits);
} else {
	// добавляем новое время визита, удаляем устаревшие, считаем сколько раз за минуту было обращений
	$userVisits[$userIPKey][] = microtime(true);
	$userVisits[$userIPKey] = deleteOldVisits($userVisits[$userIPKey]);
	$memcache->set('userVisits', $userVisits);
}

if (count($userVisits[$userIPKey]) <= MAX_VISITS) {
	echo 'Hello world!';
} else {
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
	header('Retry-After: ' . PERIOD_CHECK_SEC);
}

/**
 * Удаляем устаревшие визиты
 * 
 * @param array $visitTimes
 * @return array
 */
function deleteOldVisits ($visitTimes) {
	$newVisitTime = [];
	$timeOneMinAgo = microtime(true) - PERIOD_CHECK_SEC;
	foreach ($visitTimes as $visitTime) {
		if ($visitTime > $timeOneMinAgo) {
			$newVisitTime[] = $visitTime;
		}
	}

	return $newVisitTime;
}