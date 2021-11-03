## Chess Tier: Replace your chess.com Elo with a Tier!

## How it works
Chess Tier replaces the Elo of yourself and your chess.com opponents with the equivalent rank using a tiered rating system.

There are currently 6 tiers, each with 4 to 5 sub-tiers.
- 🔔 Bronze (~25% of players)
- 🥄 Silver (~25% of players)
- ⚜ Gold (~25% of players)
- ⚔️ Platinum (~15% of players)
- 💎 Diamond (~7% of players)
- 👑 Champion (~3% of players)

Your tier is calculated by taking your chess.com Elo (technically a <a href="https://www.chess.com/blog/kurtgodden/elo-to-glicko-your-rating-explained">Glicko rating</a>) for the specified time control and mapping it to a tier based on the <a href="https://www.chess.com/leaderboard/live">global distribution</a> of player's Elos for that time control. I chose tier mappings using a distribution with a positive skew, in order to get tiers similar to <a href="https://www.esportstales.com/league-of-legends/rank-distribution-season-9">those used in Overwatch, League of Legends, and Dota</a> while also balancing against inactive players.

You can also turn on the "use USCF ratings?" toggle to get a tier that is based on the Elo rating distribution of US Chess Federation players instead of chess.com players.

<img width="267" alt="Screen Shot 2021-10-30 at 5 51 14 PM" src="https://user-images.githubusercontent.com/13050409/139568110-82bbeece-1b80-41ae-96e0-489fa66555c6.png">


For this option, I did my best to translate chess.com Elos into USCF Elos using <a href="https://chessgoals.com/rating-comparison/"> this comparison study from chessgoals.com.</a> I used <a href="https://www.chess.com/forum/view/general/a-few-statistics-from-the-uscf-database">2014 USCF rating distribution data</a> to determine the proper tiers. Note: changed settings will not take effect until you reload the page.

## Full Elo -> Tier Rating conversion table
<table>
  <tr>
    <th>Tier</th>
    <th>Blitz/Bullet Elo</th>
    <th>Rapid Elo</th>
    <th>USCF Blitz/Bullet Elo</th>
    <th>USCF Rapid Elo</th>
  </tr>
  <tr>
    <td>🔔 Bronze I</td>
    <td>&lt 200</td>
    <td>&lt 200</td>
    <td>&lt 200</td>
    <td>&lt 250</td>
  </tr>
  <tr>
    <td>🔔 Bronze II</td>
    <td>&lt 300</td>
    <td>&lt 300</td>
    <td>&lt 400</td>
    <td>&lt 500</td>
  </tr>
  <tr>
    <td>🔔 Bronze III</td>
    <td>&lt 400</td>
    <td>&lt 400</td>
    <td>&lt 600</td>
    <td>&lt 750</td>
  </tr>
  <tr>
    <td>🔔 Bronze IV</td>
    <td>&lt 500</td>
    <td>&lt 500</td>
    <td>&lt 800</td>
    <td>&lt 1000</td>
  </tr>
  <tr>
    <td>🥄 Silver I</td>
    <td>&lt 550</td>
    <td>&lt 550</td>
    <td>&lt 1000</td>
    <td>&lt 1200</td>
  </tr>
  <tr>
    <td>🥄 Silver II</td>
    <td>&lt 600</td>
    <td>&lt 600</td>
    <td>&lt 1133</td>
    <td>&lt 1275</td>
  </tr>
  <tr>
    <td>🥄 Silver III</td>
    <td>&lt 650</td>
    <td>&lt 650</td>
    <td>&lt 1266</td>
    <td>&lt 1350</td>
  </tr>
  <tr>
    <td>🥄 Silver IV</td>
    <td>&lt 700</td>
    <td>&lt 700</td>
    <td>&lt 1400</td>
    <td>&lt 1425</td>
  </tr>
  <tr>
    <td>⚜ Gold I</td>
    <td>&lt 775</td>
    <td>&lt 775</td>
    <td>&lt 1512</td>
    <td>&lt 1500</td>
  </tr>
  <tr>
    <td>⚜ Gold II</td>
    <td>&lt 850</td>
    <td>&lt 850</td>
    <td>&lt 1624</td>
    <td>&lt 1625</td>
  </tr>
  <tr>
    <td>⚜ Gold III</td>
    <td>&lt 925</td>
    <td>&lt 925</td>
    <td>&lt 1736</td>
    <td>&lt 1750</td>
  </tr>
  <tr>
    <td>⚜ Gold IV</td>
    <td>&lt 1000</td>
    <td>&lt 1000</td>
    <td>&lt 1850</td>
    <td>&lt 1850</td>
  </tr>
  <tr>
    <td>⚔️ Platinum I</td>
    <td>&lt 1075</td>
    <td>&lt 1050</td>
    <td>&lt 1910</td>
    <td>&lt 1910</td>
  </tr>
  <tr>
    <td>⚔️ Platinum II</td>
    <td>&lt 1150</td>
    <td>&lt 1100</td>
    <td>&lt 1960</td>
    <td>&lt 1960</td>
  </tr>
  <tr>
    <td>⚔️ Platinum III</td>
    <td>&lt 1225</td>
    <td>&lt 1150</td>
    <td>&lt 2020</td>
    <td>&lt 2020</td>
  </tr>
  <tr>
    <td>⚔️ Platinum IV</td>
    <td>&lt 1300</td>
    <td>&lt 1200</td>
    <td>&lt 2100</td>
    <td>&lt 2100</td>
  </tr>
  <tr>
    <td>💎 Diamond I</td>
    <td>&lt 1400</td>
    <td>&lt 1275</td>
    <td>&lt 2150</td>
    <td>&lt 2150</td>
  </tr>
  <tr>
    <td>💎 Diamond II</td>
    <td>&lt 1500</td>
    <td>&lt 1350</td>
    <td>&lt 2200</td>
    <td>&lt 2200</td>
  </tr>
  <tr>
    <td>💎 Diamond III</td>
    <td>&lt 1600</td>
    <td>&lt 1425</td>
    <td>&lt 2250</td>
    <td>&lt 2250</td>
  </tr>
  <tr>
    <td>💎 Diamond IV</td>
    <td>&lt 1700</td>
    <td>&lt 1500</td>
    <td>&lt 2300</td>
    <td>&lt 2300</td>
  </tr>
  <tr>
    <td>👑 Champ I</td>
    <td>&lt 1800</td>
    <td>&lt 1600</td>
    <td>&lt 2350</td>
    <td>&lt 2350</td>
  </tr>
  <tr>
    <td>👑 Champ II</td>
    <td>&lt 1900</td>
    <td>&lt 1700</td>
    <td>&lt 2400</td>
    <td>&lt 2400</td>
  </tr>
  <tr>
    <td>👑 Champ III</td>
    <td>&lt 2000</td>
    <td>&lt 1800</td>
    <td>&lt 2450</td>
    <td>&lt 2450</td>
  </tr>
  <tr>
    <td>👑 Champ IV</td>
    <td>&lt 2100</td>
    <td>&lt 1900</td>
    <td>&lt 2500</td>
    <td>&lt 2500</td>
  </tr>
  <tr>
    <td>Grand 👑 Champ</td>
    <td>&gt 2100</td>
    <td>&gt 1900</td>
    <td>&gt 2500</td>
    <td>&lt 2500</td>
  </tr>
</table>

